import { useDrop } from "react-dnd";

const DropZone = ({ onDrop, children, length }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "item",
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className="relative space-y-3 px-[5%] xl:px-[10%]">
      {(isOver || length === 0) && (
        <div className="absolute left-[15%] top-[15%] flex h-[70%] w-[70%] items-center justify-center bg-black/5">
          Drop a Control check here
        </div>
      )}
      {children}
    </div>
  );
};

export default DropZone;
