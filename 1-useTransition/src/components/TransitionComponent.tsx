import { useEffect, useState, useTransition } from "react";
import { getUsers } from "../constant";
import { type PhotosType } from "./TransitionComponents.type";

const TransitionComponent = () => {
  const [user, setUser] = useState<PhotosType[]>([]);
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState<PhotosType[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUsers("photos");
        setUser(res);
        setFilteredData(res);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    };
    fetchData();
  }, []);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    startTransition(() => {
      if (!value.trim()) {
        setFilteredData(user);
        return;
      }
      const newFilteredData = user.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(newFilteredData);
    });
  };

  return (
    <div>
      <label htmlFor="search">search</label>
      <input type="text" value={input} onChange={changeHandler} />
      {isPending ? (
        <h1>Loading...</h1>
      ) : filteredData.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {filteredData.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransitionComponent;
