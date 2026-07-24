import axios from "axios";

const API = "http://localhost:8080/api/notifications";

const getToken = () => localStorage.getItem("token");

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

// Get all notifications
export const getNotifications = async () => {
  const response = await axios.get(API, authHeader());
  return response.data;
};

// Get unread notification count
export const getUnreadCount = async () => {
  const response = await axios.get(
    `${API}/unread-count`,
    authHeader()
  );
  return response.data;
};

// Mark a notification as read
export const markAsRead = async (id) => {
  await axios.put(
    `${API}/${id}/read`,
    {},
    authHeader()
  );
};

// Mark all notifications as read
export const markAllAsRead = async () => {
  await axios.put(
    `${API}/read-all`,
    {},
    authHeader()
  );
};

// Delete a notification
export const deleteNotification = async (id) => {
  await axios.delete(
    `${API}/${id}`,
    authHeader()
  );
};