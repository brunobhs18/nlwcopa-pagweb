import React, { useEffect }from "react"
import Image from "next/image";
import userAvatarExampleImg from '../assets/users-avatar-example.png'

export interface PollCardprops {
    id: string;
    code: string;
    title: string;
    ownerID: string;
    createdAt: string;
    owner: {
        name: string;
    },
    participants: {
        id: string;
        user: {
        name: string;
         avatarUrl: string;
    };
    },
    _count: {
        participants: number;
    }
}

interface Props {
    data: PollCardprops;
}


export function PollsCard({ data, ...rest }: Props){
    return (
        <form action="" className="flex mt-10 bg-gray-800 mx-auto w-1/2 px-6 py-4 rounded border gap-2">
            <div className="mr-auto ">
                <h1 className="flex-1 text-white font-bold leading-tight">{data.title}</h1>
                <span className=" text-gray-100 text-sm">Criado por {data.owner.name}</span>  
                <div>
                    <input
                    className="flex-1 px-5 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
                    type="text"
                    placeholder="Código do bolão" />
                    <button 
                        className="bg-yellow-500 px-3  mx-0.5 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-600"
                        type="submit"
                    > IR</button>
                </div>         
            </div>
                     
            <div className="flex">
                <Image src={userAvatarExampleImg} alt="pessoas no bolão" quality={100} />
                <span className="text-white">+{data._count.participants}</span>
            </div>

        </form>
    )
}


