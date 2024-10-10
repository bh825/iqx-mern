import { useDrag } from "react-dnd";

const DragItem = ({ name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "item",
    item: { name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`rounded-full border px-4 py-3 leading-none ${isDragging ? "bg-[#FFC70070]" : "bg-[#FFC70040]"} `}
    >
      {name}
    </div>
  );
};

export default DragItem;
