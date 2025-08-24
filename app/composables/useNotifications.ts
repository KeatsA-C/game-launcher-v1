import { ref } from 'vue';

interface NotificationState {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'warning';
}

interface NotificationEvent extends CustomEvent {
  detail: {
    message: string;
    type: 'success' | 'error' | 'warning';
  };
}

export const useNotifications = () => {
  const notification = ref<NotificationState>({
    show: false,
    message: '',
    type: 'success',
  });

  const showNotification = (
    message: string,
    type: 'success' | 'error' | 'warning' = 'success',
  ): void => {
    notification.value = { show: true, message, type };
  };

  const hideNotification = (): void => {
    notification.value.show = false;
  };

  const handleNotificationEvent = (event: Event): void => {
    const notificationEvent = event as NotificationEvent;
    const { message, type } = notificationEvent.detail;
    showNotification(message, type);
  };

  const setupGlobalListener = () => {
    if (typeof window !== 'undefined') {
      window.addEventListener('show-notification', handleNotificationEvent as EventListener);
    }
  };

  const cleanupGlobalListener = () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('show-notification', handleNotificationEvent as EventListener);
    }
  };

  return {
    notification,
    showNotification,
    hideNotification,
    setupGlobalListener,
    cleanupGlobalListener,
  };
};
