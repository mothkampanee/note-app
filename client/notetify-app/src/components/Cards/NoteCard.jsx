import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";

function NoteCard({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) {
  return (
    <section className="border rounded-xl p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex justify-between items-center">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">{date}</span>
        </div>

        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? "text-slate-400" : "text-black"}`}
          onClick={onPinNote}
        />
      </div>

      <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>

      <div className="flex justify-between items-center mt-2">
        <div className="text-xs text-slate-500">{tags}</div>

        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn text-slate-400 hover:text-black"
            onClick={onEdit}
          />

          <MdDelete
            className="icon-btn text-slate-400 hover:text-black"
            onClick={onDelete}
          />
        </div>
      </div>
    </section>
  );
}

export default NoteCard;
