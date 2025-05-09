'use server'

import { getMqttService, startMqttService } from '@/server/mqtt'

let initialized = false

/**
 * Initialize the MQTT service (server-only)
 */
export async function initializeMqttService() {
    console.log("call initialize mqtt")
  if (initialized) return
  try {
    await startMqttService()
    initialized = true
    console.log('MQTT service initialized successfully')
  } catch (error) {
    console.error('Failed to initialize MQTT service:', error)
  }

  return { initialized }
}

/**
 * Get the MQTT service status
 */
export async function getMqttServiceStatus() {
  if (!initialized) {
    return { status: 'not_initialized' }
  }

  try {
    const service = getMqttService()
    const isRunning = service.isRunning ? 'running' : 'stopped'
    return {
      status: isRunning,
      connected: service.isClientConnected()
    }
  } catch (error) {
    return { status: 'error', error: String(error) }
  }
}
