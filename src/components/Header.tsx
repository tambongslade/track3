import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Welcome back!</h1>
        <p>Here's what's happening with your business today.</p>
      </div>
      
      <div className="header-right">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        
        <div className="header-actions">
          <button className="notification-btn">
            🔔
            <span className="notification-badge">3</span>
          </button>
          
          <div className="user-menu">
            <div className="user-avatar">👤</div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header