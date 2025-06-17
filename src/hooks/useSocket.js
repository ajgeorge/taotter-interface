import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'

export default function useSocket({ onMessage, onTyping, onUserTyping, onUserOnline, onUserOffline, onError }) {
  const token = useSelector(state => state.auth.token)
  const socketRef = useRef(null)

  useEffect(() => {
    // Try token from Redux, fallback to localStorage
    let authToken = token || localStorage.getItem('token')
    if (!authToken) {
      console.warn('No auth token found for socket connection');
      return;
    }

    console.log('Connecting socket with token:', authToken ? 'present' : 'missing')

    // Connect socket with auth token
    const socket = io(SOCKET_URL, {
      auth: { token: authToken }
    })
    socketRef.current = socket

    // Connection events
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id)
      // Debug: log user role if available
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log('Socket user info:', user);
      } catch (e) {}
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected')
    })

    // Message events
    socket.on('new_message', (data) => {
      console.log('Socket received new_message:', data)
      onMessage && onMessage(data)
    })
    socket.on('user_typing', (data) => {
      console.log('Socket received user_typing:', data)
      onUserTyping && onUserTyping(data)
    })
    socket.on('user_online', (data) => {
      onUserOnline && onUserOnline(data)
    })
    socket.on('user_offline', (data) => {
      onUserOffline && onUserOffline(data)
    })
    socket.on('error', (err) => {
      console.error('Socket error:', err)
      onError && onError(err)
    })

    return () => {
      socket.disconnect()
    }
    // eslint-disable-next-line
  }, [token])

  // Utility functions
  const joinConversation = (conversationId) => {
    socketRef.current?.emit('join_conversation', { conversationId })
  }
  const leaveConversation = (conversationId) => {
    socketRef.current?.emit('leave_conversation', { conversationId })
  }
  const sendMessage = (data) => {
    socketRef.current?.emit('send_message', data)
  }
  const sendTyping = (conversationId, isTyping) => {
    socketRef.current?.emit('typing', { conversationId, isTyping })
  }

  return {
    socket: socketRef.current,
    joinConversation,
    leaveConversation,
    sendMessage,
    sendTyping,
  }
}
