import { LuBell } from 'react-icons/lu';

export default function Header({
  title,
  subtitle,
  unreadCount,
  avatarInitial = 'H',
  isProfileMenuOpen,
  onNotificationsClick,
  onToggleProfileMenu,
  onEditProfile,
  onLogout,
}) {
  return (
    <div className="relative overflow-visible rounded-b-[30px] bg-white px-5 pb-4 pt-5 !shadow-[0_10px_26px_rgba(30,30,30,0.08)]">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-[1.08rem] font-bold tracking-[-0.03em] text-[#1E1E1E]">{title}</p>
          <p className="mt-1 text-sm font-medium text-[#6B6B6B]">{subtitle}</p>
        </div>

        <div className="flex flex-none items-center gap-3">
          <button
            type="button"
            onClick={onNotificationsClick}
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#F4EFEB] text-[#1E1E1E] transition-all duration-300 ease-out active:scale-95"
            aria-label="Open notifications"
          >
            <LuBell className="h-5 w-5" />
            {unreadCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#8B5E3C] px-1 text-[10px] font-semibold text-white">
                {unreadCount}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            onClick={onToggleProfileMenu}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#8B5E3C] text-sm font-semibold text-white !shadow-[0_10px_24px_rgba(139,94,60,0.28)] transition-all duration-300 ease-out active:scale-95"
            aria-label="Open profile menu"
          >
            {avatarInitial}
          </button>
        </div>
      </div>

      {isProfileMenuOpen ? (
        <div className="absolute right-0 top-[calc(100%+12px)] z-20 w-48 overflow-hidden rounded-2xl bg-white py-2 !shadow-[0_16px_38px_rgba(30,30,30,0.12)]">
          <button
            type="button"
            onClick={onEditProfile}
            className="w-full px-4 py-3 text-left text-sm font-medium text-[#1E1E1E] transition-colors duration-300 ease-out hover:bg-[#F8F6F4] active:scale-[0.98]"
          >
            Edit Profile
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="w-full px-4 py-3 text-left text-sm font-medium text-[#8B5E3C] transition-colors duration-300 ease-out hover:bg-[#F8F6F4] active:scale-[0.98]"
          >
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}
