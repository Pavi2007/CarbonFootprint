import { useEffect, useState } from "react";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../services/notificationService";
import "./Notification.css";

const NotificationPanel = ({ close, refreshUnread }) => {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRead = async (id) => {
    await markAsRead(id);
    loadNotifications();
    refreshUnread();
  };

  const handleReadAll = async () => {
    await markAllAsRead();
    loadNotifications();
    refreshUnread();
  };

  const handleDelete = async (id) => {
    await deleteNotification(id);
    loadNotifications();
    refreshUnread();
  };

  return (
    <div className="notification-panel">

      <div className="notification-header">
        <h3>Notifications</h3>

        <button onClick={handleReadAll}>
          Mark All Read
        </button>
      </div>

      {notifications.length === 0 ? (
        <p className="empty">
          No notifications
        </p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-card ${
              notification.read ? "read" : "unread"
            }`}
          >

            <h4>{notification.title}</h4>

            <p>{notification.message}</p>

            <small>
              {new Date(notification.createdAt).toLocaleString()}
            </small>

            <div className="notification-actions">

              {!notification.read && (
                <button
                  onClick={() => handleRead(notification.id)}
                >
                  Mark Read
                </button>
              )}

              <button
                className="delete-btn"
                onClick={() => handleDelete(notification.id)}
              >
                Delete
              </button>

            </div>

          </div>
        ))
      )}

    </div>
  );
};

export default NotificationPanel;