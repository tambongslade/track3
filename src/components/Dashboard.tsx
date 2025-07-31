import './Dashboard.css'
import { 
  LineChart, 
  BarChart, 
  DoughnutChart, 
  AreaChart, 
  PieChart, 
  RadarChart, 
  PolarAreaChart, 
  ScatterChart, 
  BubbleChart 
} from './charts'

interface DashboardProps {
  activeSection: string
}

const Dashboard = ({ activeSection }: DashboardProps) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardHome />
      case 'analytics':
        return <AnalyticsView />
      case 'users':
        return <UsersView />
      case 'products':
        return <ProductsView />
      case 'orders':
        return <OrdersView />
      case 'settings':
        return <SettingsView />
      default:
        return <DashboardHome />
    }
  }

  return <div className="dashboard-content">{renderContent()}</div>
}

const DashboardHome = () => {
  const stats = [
    { label: 'Total Revenue', value: '$45,231', change: '+20.1%', trend: 'up' },
    { label: 'Orders', value: '1,234', change: '+15.3%', trend: 'up' },
    { label: 'Customers', value: '2,345', change: '+5.2%', trend: 'up' },
    { label: 'Products', value: '567', change: '-2.1%', trend: 'down' },
  ]

  const recentActivity = [
    { id: 1, action: 'New order received', time: '2 minutes ago', icon: '🛒' },
    { id: 2, action: 'Customer registered', time: '5 minutes ago', icon: '👤' },
    { id: 3, action: 'Product updated', time: '10 minutes ago', icon: '📦' },
    { id: 4, action: 'Payment processed', time: '15 minutes ago', icon: '💳' },
    { id: 5, action: 'Review submitted', time: '20 minutes ago', icon: '⭐' },
  ]

  // Revenue chart data
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  // Sales by category data
  const salesCategoryData = {
    labels: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports'],
    datasets: [
      {
        data: [35, 25, 15, 15, 10],
        backgroundColor: [
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6',
        ],
        borderWidth: 2,
      },
    ],
  }

  return (
    <>
      <div className="dashboard-grid">
        {stats.map((stat, index) => (
          <div key={index} className="dashboard-card stat-card">
            <h3>{stat.label}</h3>
            <div className="stat-number">{stat.value}</div>
            <div className={`stat-change ${stat.trend}`}>
              {stat.trend === 'up' ? '↗️' : '↘️'} {stat.change}
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card chart-card">
          <h3>Revenue Trend</h3>
          <AreaChart data={revenueData} height={250} />
        </div>

        <div className="dashboard-card chart-card">
          <h3>Sales by Category</h3>
          <PieChart data={salesCategoryData} height={250} />
        </div>

        <div className="dashboard-card chart-card">
          <h3>Market Share</h3>
          <PolarAreaChart data={{
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
              data: [30, 45, 35, 50],
              backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
              borderWidth: 2,
            }]
          }} height={250} />
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card chart-card">
          <h3>Performance Metrics</h3>
          <RadarChart data={{
            labels: ['Sales', 'Marketing', 'Support', 'Development', 'Design', 'Operations'],
            datasets: [{
              label: 'Current Quarter',
              data: [85, 75, 90, 80, 70, 85],
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              borderColor: '#3b82f6',
              borderWidth: 2,
              pointBackgroundColor: '#3b82f6',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: '#3b82f6'
            }]
          }} height={250} />
        </div>

        <div className="dashboard-card">
          <h3>Recent Activity</h3>
          <div className="recent-activity">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">{activity.icon}</div>
                <div className="activity-content">
                  <div className="activity-title">{activity.action}</div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

const AnalyticsView = () => {
  // Traffic data
  const trafficData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Page Views',
        data: [1200, 1900, 3000, 5000, 2000, 3000, 4500],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: '#3b82f6',
        borderWidth: 1,
      },
      {
        label: 'Unique Visitors',
        data: [800, 1200, 2000, 3200, 1500, 2100, 2800],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: '#10b981',
        borderWidth: 1,
      },
    ],
  }

  // Conversion rate data
  const conversionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Conversion Rate (%)',
        data: [2.4, 3.1, 2.8, 3.5, 4.2, 3.8],
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  // Device usage data
  const deviceData = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        data: [60, 35, 5],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
        borderWidth: 2,
      },
    ],
  }

  // Bounce rate vs session duration scatter data
  const bounceRateData = {
    datasets: [
      {
        label: 'Pages',
        data: [
          { x: 2.1, y: 45 },
          { x: 3.5, y: 38 },
          { x: 1.8, y: 52 },
          { x: 4.2, y: 28 },
          { x: 2.8, y: 41 },
          { x: 5.1, y: 22 },
          { x: 3.9, y: 35 },
          { x: 2.3, y: 48 },
        ],
        backgroundColor: '#3b82f6',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  }

  // User engagement bubble chart
  const engagementData = {
    datasets: [
      {
        label: 'User Segments',
        data: [
          { x: 20, y: 30, r: 15 }, // New Users
          { x: 40, y: 10, r: 10 }, // Returning Users
          { x: 60, y: 50, r: 20 }, // Power Users
          { x: 80, y: 70, r: 25 }, // Premium Users
          { x: 30, y: 80, r: 12 }, // Mobile Users
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: '#3b82f6',
        borderWidth: 2,
      },
    ],
  }

  return (
    <div className="section-view">
      <h2>Analytics</h2>
      <div className="dashboard-grid">
        <div className="dashboard-card chart-card">
          <h3>Website Traffic</h3>
          <BarChart data={trafficData} height={300} />
        </div>
        <div className="dashboard-card chart-card">
          <h3>Device Usage</h3>
          <DoughnutChart data={deviceData} height={300} />
        </div>
        <div className="dashboard-card chart-card">
          <h3>Bounce Rate vs Session Duration</h3>
          <ScatterChart data={bounceRateData} height={300} />
        </div>
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-card chart-card">
          <h3>Conversion Rate Trend</h3>
          <LineChart data={conversionData} height={250} />
        </div>
        <div className="dashboard-card chart-card">
          <h3>User Engagement Segments</h3>
          <BubbleChart data={engagementData} height={250} />
        </div>
      </div>
    </div>
  )
}

const UsersView = () => {
  // User growth data
  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Users',
        data: [120, 190, 300, 500, 200, 300],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Active Users',
        data: [800, 950, 1200, 1600, 1400, 1650],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  // User demographics
  const demographicsData = {
    labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
    datasets: [
      {
        data: [25, 35, 20, 15, 5],
        backgroundColor: [
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6',
        ],
        borderWidth: 2,
      },
    ],
  }

  // User activity by day
  const activityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Daily Active Users',
        data: [1200, 1900, 3000, 5000, 2000, 1500, 1800],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: '#3b82f6',
        borderWidth: 1,
      },
    ],
  }

  // User satisfaction radar chart
  const satisfactionData = {
    labels: ['Usability', 'Performance', 'Features', 'Support', 'Design', 'Value'],
    datasets: [{
      label: 'User Satisfaction',
      data: [85, 78, 92, 88, 75, 82],
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      borderColor: '#10b981',
      borderWidth: 2,
      pointBackgroundColor: '#10b981',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#10b981'
    }]
  }

  // User engagement scatter plot
  const userEngagementData = {
    datasets: [
      {
        label: 'User Engagement',
        data: [
          { x: 15, y: 85 }, // High engagement, low churn
          { x: 25, y: 75 },
          { x: 35, y: 65 },
          { x: 45, y: 55 },
          { x: 55, y: 45 },
          { x: 65, y: 35 },
          { x: 75, y: 25 }, // Low engagement, high churn
          { x: 20, y: 90 },
          { x: 30, y: 80 },
          { x: 40, y: 70 },
        ],
        backgroundColor: '#8b5cf6',
        pointRadius: 8,
        pointHoverRadius: 10,
      },
    ],
  }

  return (
    <div className="section-view">
      <h2>Users Management</h2>
      <div className="dashboard-grid charts">
        <div className="dashboard-card chart-card">
          <h3>User Growth</h3>
          <AreaChart data={userGrowthData} height={300} />
        </div>
        <div className="dashboard-card chart-card">
          <h3>Age Demographics</h3>
          <PieChart data={demographicsData} height={300} />
        </div>
        <div className="dashboard-card chart-card">
          <h3>User Satisfaction</h3>
          <RadarChart data={satisfactionData} height={300} />
        </div>
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-card chart-card">
          <h3>Daily Active Users</h3>
          <BarChart data={activityData} height={250} />
        </div>
        <div className="dashboard-card chart-card">
          <h3>Engagement vs Churn Rate</h3>
          <ScatterChart data={userEngagementData} height={250} />
        </div>
      </div>
    </div>
  )
}

const ProductsView = () => {
  // Product sales data
  const productSalesData = {
    labels: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Beauty'],
    datasets: [
      {
        label: 'Units Sold',
        data: [450, 320, 180, 240, 150, 200],
        backgroundColor: [
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6',
          '#06b6d4',
        ],
        borderWidth: 1,
      },
    ],
  }

  // Inventory levels
  const inventoryData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'In Stock',
        data: [1200, 1150, 1300, 1100, 1250, 1180],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Low Stock',
        data: [45, 52, 38, 65, 42, 58],
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  // Top products
  const topProductsData = {
    labels: ['iPhone 15', 'MacBook Pro', 'AirPods', 'iPad', 'Apple Watch'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [25000, 45000, 12000, 18000, 15000],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: '#3b82f6',
        borderWidth: 1,
      },
    ],
  }

  // Product performance radar chart
  const productPerformanceData = {
    labels: ['Quality', 'Price', 'Availability', 'Marketing', 'Reviews', 'Support'],
    datasets: [{
      label: 'Product Performance',
      data: [88, 72, 95, 78, 85, 80],
      backgroundColor: 'rgba(245, 158, 11, 0.2)',
      borderColor: '#f59e0b',
      borderWidth: 2,
      pointBackgroundColor: '#f59e0b',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#f59e0b'
    }]
  }

  // Product price vs sales scatter plot
  const priceSalesData = {
    datasets: [
      {
        label: 'Products',
        data: [
          { x: 299, y: 450 }, // Electronics
          { x: 89, y: 320 },  // Clothing
          { x: 25, y: 180 },  // Books
          { x: 150, y: 240 }, // Home & Garden
          { x: 199, y: 150 }, // Sports
          { x: 45, y: 200 },  // Beauty
          { x: 399, y: 380 },
          { x: 129, y: 290 },
          { x: 79, y: 160 },
          { x: 249, y: 220 },
        ],
        backgroundColor: '#ef4444',
        pointRadius: 8,
        pointHoverRadius: 10,
      },
    ],
  }

  return (
    <div className="section-view">
      <h2>Products</h2>
      <div className="dashboard-grid charts">
        <div className="dashboard-card chart-card">
          <h3>Sales by Category</h3>
          <PolarAreaChart data={productSalesData} height={300} />
        </div>
        <div className="dashboard-card chart-card">
          <h3>Top Products Revenue</h3>
          <BarChart data={topProductsData} height={300} />
        </div>
        <div className="dashboard-card chart-card">
          <h3>Product Performance</h3>
          <RadarChart data={productPerformanceData} height={300} />
        </div>
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-card chart-card">
          <h3>Inventory Levels</h3>
          <AreaChart data={inventoryData} height={250} />
        </div>
        <div className="dashboard-card chart-card">
          <h3>Price vs Sales Volume</h3>
          <ScatterChart data={priceSalesData} height={250} />
        </div>
      </div>
    </div>
  )
}

const OrdersView = () => {
  // Orders over time
  const ordersTimeData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Orders',
        data: [65, 89, 120, 151, 142, 189],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  // Order status distribution
  const orderStatusData = {
    labels: ['Completed', 'Processing', 'Shipped', 'Cancelled'],
    datasets: [
      {
        data: [65, 20, 12, 3],
        backgroundColor: ['#10b981', '#f59e0b', '#3b82f6', '#ef4444'],
        borderWidth: 2,
      },
    ],
  }

  // Daily orders
  const dailyOrdersData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Orders',
        data: [12, 19, 30, 50, 20, 30, 45],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: '#3b82f6',
        borderWidth: 1,
      },
    ],
  }

  // Order fulfillment performance radar
  const fulfillmentData = {
    labels: ['Speed', 'Accuracy', 'Quality', 'Communication', 'Packaging', 'Delivery'],
    datasets: [{
      label: 'Fulfillment Performance',
      data: [92, 88, 95, 85, 90, 87],
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      borderColor: '#10b981',
      borderWidth: 2,
      pointBackgroundColor: '#10b981',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#10b981'
    }]
  }

  // Order value vs processing time bubble chart
  const orderValueData = {
    datasets: [
      {
        label: 'Orders',
        data: [
          { x: 50, y: 2, r: 8 },   // Low value, fast processing
          { x: 150, y: 3, r: 12 }, // Medium value, medium processing
          { x: 300, y: 5, r: 15 }, // High value, slower processing
          { x: 75, y: 1.5, r: 10 },
          { x: 200, y: 4, r: 14 },
          { x: 500, y: 8, r: 20 }, // Premium orders
          { x: 100, y: 2.5, r: 11 },
          { x: 250, y: 6, r: 16 },
        ],
        backgroundColor: 'rgba(139, 92, 246, 0.6)',
        borderColor: '#8b5cf6',
        borderWidth: 2,
      },
    ],
  }

  return (
    <div className="section-view">
      <h2>Orders</h2>
      <div className="dashboard-grid charts">
        <div className="dashboard-card chart-card">
          <h3>Order Status</h3>
          <PieChart data={orderStatusData} height={300} />
        </div>
        <div className="dashboard-card chart-card">
          <h3>Daily Orders</h3>
          <BarChart data={dailyOrdersData} height={300} />
        </div>
        <div className="dashboard-card chart-card">
          <h3>Fulfillment Performance</h3>
          <RadarChart data={fulfillmentData} height={300} />
        </div>
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-card chart-card">
          <h3>Orders Over Time</h3>
          <AreaChart data={ordersTimeData} height={250} />
        </div>
        <div className="dashboard-card chart-card">
          <h3>Order Value vs Processing Time</h3>
          <BubbleChart data={orderValueData} height={250} />
        </div>
      </div>
    </div>
  )
}

const SettingsView = () => (
  <div className="section-view">
    <h2>Settings</h2>
    <div className="dashboard-grid">
      <div className="dashboard-card">
        <h3>General Settings</h3>
        <div className="settings-form">
          <div className="form-group">
            <label>Company Name</label>
            <input type="text" defaultValue="My Company" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" defaultValue="admin@company.com" />
          </div>
          <button>Save Changes</button>
        </div>
      </div>
    </div>
  </div>
)

export default Dashboard