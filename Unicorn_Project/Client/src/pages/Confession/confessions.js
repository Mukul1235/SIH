import { useState } from "react";

const Confession = (props) => {
  const [isrec, setIsrec] = useState(
    JSON.parse(localStorage.getItem(`reactions_${props.id}`)) || [0, 0, 0, 0, 0]
  );
  const [countrec, setcountrec] = useState(props.emojis);

  const handleClick = (id) => {
    setcountrec(isrec[id] ? countrec - 1 : countrec + 1);
    props.onSelect(0, props.id, isrec[id] ? countrec - 1 : countrec + 1);
    const List = isrec;
    List[id] = !List[id];
    setIsrec(List);
    localStorage.setItem(`reactions_${props.id}`, JSON.stringify(List));
  };

  return (
    <div className="my-8">
      <section
        className={`${
          props.genre === "Feelings"
            ? "bg-red-500"
            : props.genre === "Express"
            ? "bg-green-600"
            : "bg-indigo-700"
        } p-2 text-[20px] text-white font-bold rounded-tl-lg rounded-tr-lg`}
      >
        # Confession {props.id}
        <div className="text-arial text-[10px] sm-[300px]:text-[15px] sm-[300px]:leading-[30px] sm-[300px]:float-right">Confessed On : {props.date}</div>
      </section>
      <div className="border-2 shadow-md p-4">
        <div>{props.text}</div>
        {/* <div className="bg-white float-right rounded-lg border-2 h-[25px] w-[195px]"> */}
        <span className="border-2 border-black shadow-lg mr-1 text-[12px] w-[20px] h-[20px] float-right bg-indigo-700 rounded-[50%] text-center font-bold text-white my-[6px]">
          {countrec}
        </span>
        <span
          className={`mr-1 ${
            isrec[0] ? "text-[25px]" : " text-[20px]"
          } float-right  bg-white rounded-[50%]`}
          onClick={() => {
            handleClick(0);
          }}
        >
          {props.genre=='Feelings'?"❤️":props.genre=='Express'?"👍":"🙌"}
        </span>
        {/* <span
          className={`mr-1 ${
            isrec[1] ? "text-[25px]" : " text-[20px]"
          } float-right  bg-white rounded-[50%]`}
          onClick={() => {
            props.onSelect(1, props.id, countrec);
            handleClick(1);
          }}
        >
          😍
        </span> */}
        {/* <span
          className={`mr-1 ${
            isrec[2] ? "text-[25px]" : " text-[20px]"
          } float-right  bg-white rounded-[50%]`}
          onClick={() => {
            props.onSelect(2, props.id, countrec);
            handleClick(2);
          }}
        >
          🤬
        </span>
        <span
          className={`mr-1 ${
            isrec[3] ? "text-[25px]" : " text-[20px]"
          } float-right  bg-white rounded-[50%]`}
          onClick={() => {
            props.onSelect(3, props.id, countrec);
            handleClick(3);
          }}
        >
          😭

        </span>
        <span
          className={`mr-1 ${
            isrec[4] ? "text-[25px]" : " text-[20px]"
          } float-right  bg-white rounded-[50%]`}
          onClick={() => {
            props.onSelect(4, props.id, countrec);
            handleClick(4);
          }}
        >
          🤯
        </span> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Confession;
