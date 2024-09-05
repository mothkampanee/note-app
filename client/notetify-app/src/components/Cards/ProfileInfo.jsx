import { getInitials } from "../../utils/validation";

function ProfileInfo({ userInfo, onLogout }) {
  return (
    userInfo && (
      <section className="flex items-center gap-3">
        <div className="w-12 h-12 flex justify-center items-center rounded-full text-slate-950 font-medium bg-[#f1f1f1]">
          {getInitials(userInfo.fullName)}
        </div>
        <div>
          <p className="text-sm font-medium">{userInfo.fullName}</p>
          <button
            className="text-sm text-slate-700 underline"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </section>
    )
  );
}

export default ProfileInfo;
