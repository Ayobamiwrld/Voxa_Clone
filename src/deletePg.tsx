import { Trash } from "iconsax-reactjs";

type DeletePgProps = {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel: string;
};

export default function DeletePg(props: DeletePgProps) {
  return (
    <div className="grid min-h-dvh place-items-center p-4">
      <div className="flex flex-col justify-center items-center bg-white w-80 h-80 gap-8 rounded-2xl">
        <div className="flex flex-col justify-center items-center gap-4">
          <Trash size="60" color="#f47379" variant="TwoTone" />
          <p className="text-2xl font-bold text-black">{props.title}</p>
          <p className="text-[13px] text-gray-400 text-center text-balance">
            {props.description}
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <button
            className="bg-linear-to-br from-gray-300 to-gray-500 rounded-4xl p-3 text-white cursor-pointer"
            onClick={props.onClose}
          >
            Cancel Action
          </button>
          <button
            className="bg-red-600 p-3 rounded-4xl text-white cursor-pointer"
            onClick={props.onConfirm}
          >
            {props.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
