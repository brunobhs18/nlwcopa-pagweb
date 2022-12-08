import { PollsCard, PollCardprops } from "../components/PollsCard"
import Link from 'next/link';
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import FlatList from "flatlist-react";

export default function Polls(){
  const [pools, setPools] = useState<PollCardprops[]>([]);
  
  async function fetchPolls(){
    try{
        const response = await api.get('/pools');
        setPools(response.data.pools);
    } catch (error) {
      console.log(error);
    }
  }  
  
  useEffect(() =>{
    fetchPolls();
  }, []);
    return (
       <div className="max-w-[1124px] h-screen mx-auto items-center">
        <header>
          
            <Link
            href="/"
            className=" my-10 bg-yellow-500 px-4 py-2 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-600"
            >Home</Link>          
        </header>
        <main>
          <form action="" className="" >
            <input
              className="flex flex-col mt-6 mx-auto w-1/2 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
              type="text"
              required
              placeholder="Qual é o nome do bolão?"
              />
              <button
                className="flex bg-yellow-500 mx-auto w-1/2 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-600"
                type="submit"
                >
                  Buscar bolão
          </button>
          </form>
          <FlatList
          list={pools}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <PollsCard data={item} />} 
          />
        
          
        </main>
      </div>
    )
}