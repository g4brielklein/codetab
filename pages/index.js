function Home() {
    const techs = [{ id: 1, name: 'JavaScript' }, { id: 2, name: 'NodeJS' }, { id: 3, name: 'PostgreSQL' }]

    const technologies = techs.map(tech => tech.name.concat(' '))

    return (
        <>
            <h1>{technologies}</h1>
        </>
    )
}

export default Home
