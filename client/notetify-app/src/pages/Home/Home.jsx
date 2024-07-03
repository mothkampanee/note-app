import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { VscNewFile } from "react-icons/vsc";
import AddEditNoteForm from "../../components/Form/AddEditNoteForm";
import { useState } from "react";
import Modal from "react-modal";

function Home() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShow: false,
    type: "create",
    data: null,
  });

  return (
    <>
      <Navbar />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <button
            className="flex justify-center items-center border-2 border-dashed border-slate-1000 rounded-xl hover:bg-[#f1f1f1] hover:border-[#f1f1f1] hover:shadow-xl transition-all ease-in-out"
            onClick={() => {
              setOpenAddEditModal({ isShow: true, type: "create", data: null });
            }}
          >
            <VscNewFile className="text-[60px] text-slate-400 hover:text-black" />
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

      <Modal
        isOpen={openAddEditModal.isShow}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-xl mx-auto mt-14 p-5"
      >
        <AddEditNoteForm
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShow: false, type: "create", data: null });
          }}
        />
      </Modal>
    </>
  );
}

export default Home;
