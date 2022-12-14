import Image from "next/image";
import appPreviewImg from "../assets/app-nlw-copa-preview.png";
import logoImg from "../assets/logo.svg"
import userAvatarExampleImg from '../assets/users-avatar-example.png'
import iconCheckImg from '../assets/icon-check.svg'
import { api } from "../lib/axios";
import { FormEvent, useState } from "react";
import Link from 'next/link';
import { auth } from "../service/firebase";
import { signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";



interface HomeProps{
  poolCount: number;
  guessesCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')  
  const provider = new GoogleAuthProvider(); 
  const [user, setUser] = useState<User>({} as User);
  
  function Login() {    
    signInWithPopup(auth, provider)
    .then((result) => {          
      setUser(result.user);         
    }).catch((error) => {    
      console.log(error); 
    });
}
  
 async function createPool(event: FormEvent){
     event.preventDefault() 

    try{
      const response = await api.post('/pools', {
        title: poolTitle,
     });

     const { code } = response.data

     await navigator.clipboard.writeText(code)

     alert('Bolão criado com sucesso, o códifo foi copiado para a área de transferência!')

     setPoolTitle('')
     
    } catch(err){
      console.log(err)
      alert('Falha ao criar o bolão, tente novamente!')
    }
  }

  
  return (
    <div>
      <header>
        <div className="flex flex-row-reverse bg-gray-800 h-8">
          <div className="flex mx-2">{user.photoURL && <img className="rounded-full" src={user.photoURL} alt="Foto do usuário" />}</div> 
          {/* <Link  className="bg-yellow-500 mx-2 px-4 py-2 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-600"
                href="/polls"
              >Ver Bolões</Link>         */}
           <button
              className="bg-yellow-500 px-4 py-2 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-600" 
              onClick={Login}>Login com Google
            </button>
            
        </div>
        </header>
      <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
       
        <main>
          <div></div>
          <Image src={logoImg} alt="NLW Copa" />
          <h1 className="mt-6 text-white text-5xl font-bold leading-tight">Crie seu próprio bolão da copa e compartilhe entre amigoss!</h1>
          <div className="mt-10 flex items-center gap-2">
            <Image src={userAvatarExampleImg} alt="" />
            <strong className="text-gray-100 text-xl">
              <span className="text-ignite-500">+{props.userCount}</span> pessoas já estão usando
            </strong>
          </div>
          <form onSubmit={createPool} className="mt-10 flex gap-2">
            <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text"
            required
            placeholder="Qual é o nome do seu bolão?"
            onChange={event => setPoolTitle(event.target.value)}
            value={poolTitle}
            />
            <button
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-600"
            type="submit"
            >
              Criar meu bolão
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-300 leading-relaxed">
            Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas</p>
          <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
            <div className="flex items-center gap-6">
              <Image src={iconCheckImg} alt="" />
              <div className="flex flex-col">
                <span className="font-bold text-2xl">+{props.poolCount}</span>
                <span>Bolões criados</span>
              </div>
            </div>
            <div className="w-px h-14 bg-gray-600" />
            <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />
              <div className="flex flex-col">
                <span className="font-bold text-2xl">+{props.guessesCount}</span>
                <span>Palpites envidados</span>
              </div>
            </div>
          </div>
        </main>
        
                   
            <Image src={appPreviewImg} alt="Dois celulares exibindo uma prévia"
            quality={100} className="my-10 sm"
            />
     
        
      </div>
    </div>
  )
  
}

export const getServerSideProps = async () => {
    const [
      poolCountResponse, 
      guessesCountResponse,
      userCountResponse
    ] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count')
  ])
  
  
  return{
    props: {
      poolCount: poolCountResponse.data.count,
      guessesCount: guessesCountResponse.data.count,
      userCount: userCountResponse.data.count,
    }
  }
  

}
