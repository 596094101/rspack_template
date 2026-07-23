import { useEffect, useState } from "react";

const MyTest = () => {
  const [mySet, setMySet] = useState(new Set([1, 2, 3, 4, 5]));
  const [a, setA] = useState(1);

  useEffect(() => {
    console.log("Component rendered");
    mySet.delete(2); // 删除元素
    console.log(mySet); // 删除元素后输出 Set {1, 3, 4, 5}
  }, []);

  console.log(mySet, "1111");

  return (
    <div
      onClick={() => {
        mySet.add(6);
        setA(3)
      }}
    >
      {mySet.has(2) ? "2 is in the set" : "2 is not in the set"}
    </div>
  );

  // return (
  //   <div
  //     style={{ "--c": "red" }}
  //     className={style.text_color}
  //     text-color="#eee"
  //   >
  //     123
  //   </div>
  // );
};

export default MyTest;
