import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { VscNewFile } from "react-icons/vsc";

function Home() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <button
            className="flex justify-center items-center border-2 border-dashed border-slate-1000 rounded-xl hover:shadow-xl transition-all ease-in-out"
            onClick={() => {}}
          >
            <VscNewFile className="text-[32px] text-slate-400 hover:text-black" />
          </button>
          <NoteCard
            title="Meeting"
            date="3rd Apr 2024"
            content="Meeting"
            tags="#Meeting"
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
