import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const mainNav = [
  { to: '/', label: '首页', emoji: '🏠' },
  { to: '/chapters', label: '全部章节', emoji: '📚' },
];

const toolNav = [
  { to: '/module/prompt-library', label: '提示词库', emoji: '📋' },
  { to: '/module/tool-comparison', label: '工具对比', emoji: '⚖️' },
  { to: '/module/project-ideas', label: '项目创意', emoji: '💡' },
  { to: '/module/troubleshooting', label: '故障排查', emoji: '🔧' },
  { to: '/module/learning-path', label: '学习路径', emoji: '🗺️' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`navbar-modern ${scrolled ? 'scrolled' : ''}`}
      role="navigation"
      aria-label="主导航"
    >
      <div className="navbar-inner">
        {/* ===== Logo ===== */}
        <Link to="/" className="navbar-logo" aria-label="Vibe Coding 首页">
          <span className="logo-icon">💎</span>
          <span className="logo-text">
            Vibe <span className="logo-accent">Coding</span>
          </span>
        </Link>

        {/* ===== Desktop Navigation ===== */}
        <div className="navbar-links">
          {/* 主导航 */}
          <div className="nav-group nav-main">
            {mainNav.map(link => (
              <NavLink key={link.to} to={link.to} active={location.pathname === link.to}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* 分隔符 */}
          <div className="nav-divider" aria-hidden="true" />

          {/* 工具导航 */}
          <div className="nav-group nav-tools">
            {toolNav.map(link => (
              <NavLink key={link.to} to={link.to} active={location.pathname === link.to}>
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* ===== Mobile Menu Button ===== */}
        <button
          className="mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
          aria-expanded={menuOpen}
        >
          <span className={`hamburger ${menuOpen ? 'open' : ''}`}>
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {/* ===== Mobile Menu ===== */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-inner">
          <div className="mobile-section">
            <span className="mobile-section-label">导航</span>
            {mainNav.map(link => (
              <MobileNavLink
                key={link.to}
                to={link.to}
                active={location.pathname === link.to}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </MobileNavLink>
            ))}
          </div>
          <div className="mobile-section">
            <span className="mobile-section-label">工具</span>
            {toolNav.map(link => (
              <MobileNavLink
                key={link.to}
                to={link.to}
                active={location.pathname === link.to}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </MobileNavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ===== 子组件：桌面端导航链接 ===== */
function NavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`nav-link ${active ? 'active' : ''}`}
    >
      {children}
      {active && <span className="nav-indicator" />}
    </Link>
  );
}

/* ===== 子组件：移动端导航链接 ===== */
function MobileNavLink({ to, active, onClick, children }) {
  return (
    <Link
      to={to}
      className={`mobile-nav-link ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      <span className="mobile-link-text">{children}</span>
      {active && <span className="mobile-check">✓</span>}
    </Link>
  );
}
