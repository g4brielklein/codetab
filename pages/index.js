function Home() {
    const techs = [{ id: 1, name: 'JavaScript' }, { id: 2, name: 'NodeJS' }, { id: 3, name: 'PostgreSQL' }]

    const technologies = techs.map(tech => tech.name.concat(' '))

    return (
        <>
            <h1>Retornando uma frase teste - testando os deploys da Vercel</h1>
        </>
    )
}

export default Home
