import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">LinkedIn Analizer
        <br className="max-md:hidden"/>
        <span className="orange_gradient text-center">AI Powered Tools</span> 
      </h1>
      <p className="desc text-center">
        Linayser is a tool that helps you to analyze your LinkedIn profile and gives you feedback about your profile.
      </p>

      {/* Feed */}
      <Feed />
    </section>
  )
}

export default Home
