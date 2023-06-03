'use client'

import {useState, useEffect} from 'react'
import PromptCard from './PromptCard'
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from 'next/link';
import Image from 'next/image';
import { saveAs } from 'file-saver';

const PromptCardList = ({data, handleTagClick})=>{
  return(
    <div className="mt-16 prompt_layout">
      {data.map((post)=>(
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}
const Feed = () => {
  const [searchText, setSearchText] = useState("")
  const [posts, setPosts] = useState([]);
  const [providers, setProviders] = useState(null);
  const { data: session } = useSession();
  const [apiData, setApiData] = useState(null);

  const handleDownloadPDF = () => {
    // API'den gelen bilgileri kullanarak PDF dosyasını oluşturma ve indirme işlemleri burada gerçekleştirilir
    // Örnek olarak, bir PDF oluşturup indirme işlemi:
    const pdfContent = generatePDFContent(apiData); // API'den gelen verilere dayanarak PDF içeriği oluşturulur
    const pdfBlob = new Blob([pdfContent], { type: 'application/pdf' });
    saveAs(pdfBlob, 'api_data.pdf');
  };
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleInput = () => {
    const datalist = document.getElementById('jobs');
    const options = Array.from(datalist.options);
  
    const selectedOption = options.find((option) =>
      option.value.toLowerCase().includes(searchText.toLowerCase())
    );
  
    if (selectedOption) {
      setSearchText(selectedOption.value);
    }
  };

  useEffect(()=>{
    const fetchPosts = async () =>{
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }

    fetchPosts();
  },[]);
    
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="What job do you want to have 🎯"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          list="jobs"
          onInput={handleInput}
        />
        <datalist id="jobs">
            <option value="Yazılım Mühendisi" />
            <option value="Grafik Tasarımcısı" />
            <option value="Data Analist" />
            <option value="Mimar" />
            <option value="Makine Mühendisi" />
            <option value="PCB Tasarımcısı" />
            <option value="Yapay Zeka Mühendisi" />
            <option value="Frontend Developer" />
            <option value="Fullstack Developer" />
            <option value="DevOps Engineer" />
        </datalist>
        {session?.user &&
        <button
            className="absolute right-0 h-full px-4 font-medium text-white bg-blue-500 hover:bg-blue-600">
            Show Results
          </button>
        }
      </form>
      {session?.user ? (
          <div>
            <Link href='/profile'>
              <img
                src={session.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in With {provider.name}
                </button>
              ))}
          </>
        )}
          {/* API'den gelen bilgileri görüntülemek için yazı alanı */}
          <div className="glassmorphism-container">
                {apiData ? (
                  <div className="api-data-container">
                    {/* API'den gelen bilgileri burada görüntüleyebilirsiniz */}
                  </div>
                ) : (
                  <div className="api-data-placeholder">
                    hey HFHDHGDHDFJDJHD
                    HFHFHFJHFGKJGKKHGKU
                    HFJFJHFJHJHFJHFJHFJHHGDDGHHDG
                    {/* API'den gelen bilgiler henüz yüklenmediğinde burada bir yer tutucu gösterilebilir */}
                  </div>
                )}
                {apiData && (
                  <button
                    className="download-btn"
                    onClick={handleDownloadPDF}
                  >
                    Download as PDF
                  </button>
                )}
      </div>

      <PromptCardList
        data={posts}
        handleTagClick={()=>{}}
      />
    </section>
  )
}

export default Feed
