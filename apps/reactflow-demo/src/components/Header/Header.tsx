import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  Menu,
  Search,
  Building2,
  ChevronDown,
  ChevronRight,
  Bell,
  Plus,
  Globe,
  LayoutGrid,
  SunMedium,
  LogOut,
  CheckSquare,
  List,
} from "lucide-react";
import "./tokens.css";
import "./Header.css";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export type ButtonVariant = "primary" | "tertiary";

export interface NavItem {
  label: string;
  href?: string;
  active?: boolean;
}

/** 動作按鈕 — product-level action buttons (FAQ, Feedback, primary CTA…). */
export interface ActionButton {
  label: string;
  icon?: ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
}

/** 個人設定 — personalization items (Language → Site → Color Theme). */
export interface SettingItem {
  label: string;
  icon?: ReactNode;
  /** Renders a flyout submenu. */
  submenu?: string[];
  /** Renders an inline on/off switch instead of a submenu. */
  toggle?: boolean;
}

/** Free-form items at the top of the Avatar menu (e.g. Select Item 1/2). */
export interface AvatarMenuItem {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
}

export interface HeaderProps {
  /** Brand mark. Defaults to the LOGO lockup. */
  logo?: ReactNode;
  /** Org / site switcher label. Hidden when omitted. */
  orgLabel?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  navItems?: NavItem[];
  /** 動作按鈕 — shown inline, or collapsed into the Avatar menu. */
  actionButtons?: ActionButton[];
  /** 個人設定 — always live inside the Avatar menu. */
  settings?: SettingItem[];
  /** Items pinned to the top of the Avatar menu when nothing is collapsed. */
  avatarMenuItems?: AvatarMenuItem[];
  showNotification?: boolean;
  hasNotification?: boolean;
  avatarSrc?: string;
  /**
   * Button collapsing (按鈕的收納):
   * - "auto"   collapse when actionButtons + settings > collapseThreshold
   * - "always" force everything into the Avatar menu
   * - "never"  always inline
   */
  collapse?: "auto" | "always" | "never";
  /** Threshold for "auto". Default 6 (per the Figma spec). */
  collapseThreshold?: number;
  theme?: "light" | "dark";
  onThemeToggle?: () => void;
  onLogout?: () => void;
  /** Open the Avatar menu on mount — handy for stories / visual tests. */
  defaultMenuOpen?: boolean;
}

/* ------------------------------------------------------------------ */
/* Defaults                                                           */
/* ------------------------------------------------------------------ */

const DefaultLogo = (
  <span className="hd__logo">
    <span className="hd__logo-mark">LO</span>
    <span className="hd__logo-word">LOGO</span>
  </span>
);

const FALLBACK_AVATAR =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7b8cff"/><stop offset="1" stop-color="#3351fa"/></linearGradient></defs><rect width="56" height="56" fill="url(#g)"/><circle cx="28" cy="22" r="10" fill="#fff" opacity=".9"/><path d="M10 52c2-12 34-12 36 0z" fill="#fff" opacity=".9"/></svg>`
  );

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export const Header: React.FC<HeaderProps> = ({
  logo = DefaultLogo,
  orgLabel = "HQ",
  showSearch = true,
  searchPlaceholder = "Search",
  navItems = [],
  actionButtons = [],
  settings = [],
  avatarMenuItems = [],
  showNotification = true,
  hasNotification = false,
  avatarSrc,
  collapse = "auto",
  collapseThreshold = 6,
  theme = "light",
  onThemeToggle,
  onLogout,
  defaultMenuOpen = false,
}) => {
  const [open, setOpen] = useState(defaultMenuOpen);
  const rootRef = useRef<HTMLElement>(null);

  const isCollapsed =
    collapse === "always" ||
    (collapse === "auto" &&
      actionButtons.length + settings.length > collapseThreshold);

  /* close on outside click / Esc */
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const renderSetting = useCallback(
    (s: SettingItem) => {
      if (s.toggle) {
        return (
          <div
            key={s.label}
            className="hd__mi"
            role="menuitemcheckbox"
            aria-checked={theme === "dark"}
            onClick={(e) => {
              e.stopPropagation();
              onThemeToggle?.();
            }}
          >
            <span className="hd__mi-lead">{s.icon ?? <SunMedium size={16} />}</span>
            <span className="hd__mi-label">{s.label}</span>
            <span className="hd__switch" data-on={theme === "dark"}>
              <span className="hd__switch-knob" />
            </span>
          </div>
        );
      }
      if (s.submenu) {
        return (
          <div key={s.label} className="hd__mi hd__mi--sub" role="menuitem">
            <span className="hd__mi-lead">{s.icon}</span>
            <span className="hd__mi-label">{s.label}</span>
            <ChevronRight className="hd__caret" size={14} />
            <div className="hd__submenu" role="menu">
              {s.submenu.map((o) => (
                <div key={o} className="hd__mi" role="menuitem">
                  {o}
                </div>
              ))}
            </div>
          </div>
        );
      }
      return (
        <div key={s.label} className="hd__mi" role="menuitem">
          <span className="hd__mi-lead">{s.icon}</span>
          <span className="hd__mi-label">{s.label}</span>
        </div>
      );
    },
    [theme, onThemeToggle]
  );

  return (
    <header className="hd" ref={rootRef}>
      {/* ---------- left cluster ---------- */}
      <div className="hd__left">
        <button className="hd__icon" aria-label="Menu">
          <Menu size={18} />
        </button>
        {logo}
        {orgLabel && (
          <button className="hd__org">
            <Building2 size={16} />
            <span>{orgLabel}</span>
            <ChevronDown className="hd__caret" size={14} />
          </button>
        )}
        {showSearch && (
          <span className="hd__search">
            <Search size={15} />
            <input placeholder={searchPlaceholder} aria-label="Search" />
          </span>
        )}
      </div>

      {/* ---------- right cluster ---------- */}
      <div className="hd__right">
        {navItems.length > 0 && (
          <nav className="hd__nav">
            {navItems.map((n) => (
              <a
                key={n.label}
                href={n.href ?? "#"}
                className={
                  "hd__nav-link" + (n.active ? " hd__nav-link--active" : "")
                }
                aria-current={n.active ? "page" : undefined}
              >
                {n.label}
              </a>
            ))}
          </nav>
        )}

        {!isCollapsed &&
          actionButtons.map((b) => (
            <button
              key={b.label}
              className={`hd__btn hd__btn--${b.variant ?? "tertiary"}`}
              onClick={b.onClick}
            >
              {b.icon}
              <span>{b.label}</span>
            </button>
          ))}

        <span className="hd__vr" />

        {showNotification && (
          <button className="hd__icon" aria-label="Notifications">
            <Bell size={18} />
            {hasNotification && <span className="hd__badge" />}
          </button>
        )}

        <button
          className="hd__avatar-btn"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <img className="hd__avatar" src={avatarSrc ?? FALLBACK_AVATAR} alt="User" />
          <ChevronDown className="hd__caret" size={14} />
        </button>
      </div>

      {/* ---------- avatar menu ---------- */}
      {open && (
        <div className="hd__menu" role="menu">
          {isCollapsed ? (
            <>
              <div className="hd__section">Actions</div>
              {actionButtons.map((b) => (
                <div
                  key={b.label}
                  className={
                    "hd__mi" + (b.variant === "primary" ? " hd__mi--primary" : "")
                  }
                  role="menuitem"
                  onClick={() => {
                    b.onClick?.();
                    setOpen(false);
                  }}
                >
                  <span className="hd__mi-lead">{b.icon}</span>
                  <span className="hd__mi-label">{b.label}</span>
                </div>
              ))}
              <div className="hd__sep" />
            </>
          ) : (
            avatarMenuItems.length > 0 && (
              <>
                {avatarMenuItems.map((m) => (
                  <div
                    key={m.label}
                    className="hd__mi"
                    role="menuitem"
                    onClick={() => {
                      m.onClick?.();
                      setOpen(false);
                    }}
                  >
                    <span className="hd__mi-lead">{m.icon}</span>
                    <span className="hd__mi-label">{m.label}</span>
                  </div>
                ))}
                <div className="hd__sep" />
              </>
            )
          )}

          {settings.length > 0 && (
            <>
              <div className="hd__section">Settings</div>
              {settings.map(renderSetting)}
              <div className="hd__sep" />
            </>
          )}

          <div
            className="hd__mi"
            role="menuitem"
            onClick={() => {
              onLogout?.();
              setOpen(false);
            }}
          >
            <span className="hd__mi-lead">
              <LogOut size={16} />
            </span>
            <span className="hd__mi-label">Log Out</span>
          </div>
        </div>
      )}
    </header>
  );
};

/* Convenience icon presets so stories stay terse. */
export const headerIcons = {
  list: <List size={15} />,
  grid: <LayoutGrid size={15} />,
  plus: <Plus size={15} />,
  globe: <Globe size={16} />,
  site: <LayoutGrid size={16} />,
  theme: <SunMedium size={16} />,
  check: <CheckSquare size={16} />,
};

export default Header;
