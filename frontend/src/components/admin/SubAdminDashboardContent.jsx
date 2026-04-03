import React from 'react';
import { adminUi, statusBadge } from './adminStyles';
import { APP_NAME } from '../../constants/branding';

const SubAdminDashboardContent = () => {
  const stats = [
    { label: 'Assigned Tasks', value: '12' },
    { label: 'Sales This Week', value: 'Rs 8.5L' },
    { label: 'Team Members', value: '8' },
    { label: 'Pending Orders', value: '23' },
  ];

  const tasks = [
    { id: 1, title: 'Process Order #4521', status: 'In Progress', priority: 'High', dueDate: 'Today' },
    { id: 2, title: 'Update Inventory Stock', status: 'Pending', priority: 'Medium', dueDate: 'Tomorrow' },
    { id: 3, title: 'Customer Follow-up Calls', status: 'Completed', priority: 'Low', dueDate: 'Yesterday' },
    { id: 4, title: 'Prepare Weekly Report', status: 'Pending', priority: 'High', dueDate: 'Friday' },
  ];

  return (
    <div className={adminUi.page}>
      <div>
        <h1 className={adminUi.pageTitle}>Sub Admin Dashboard</h1>
        <p className={adminUi.pageDescription}>{`Department-based operations in the same ${APP_NAME} analytics style.`}</p>
      </div>

      <div className={adminUi.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.label} className={adminUi.card}>
            <p className={adminUi.cardTitle}>{stat.label}</p>
            <p className={adminUi.cardValue}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className={adminUi.panel}>
        <div className={adminUi.panelHeader}>
          <h2 className={adminUi.panelTitle}>My Assigned Tasks</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between"
            >
              <div>
                <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className={statusBadge(task.status)}>{task.status}</span>
                <span className={statusBadge(task.priority)}>{task.priority}</span>
                <span className="text-sm text-gray-500">{task.dueDate}</span>
                <button className={adminUi.primaryButton}>View</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubAdminDashboardContent;
