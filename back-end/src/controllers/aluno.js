import prisma from '../database/client.js'

const controller = {}   // Objeto vazio

controller.create = async function(req, res) {
  try {

    // Conecta-se ao BD e envia uma instrução
    // de criação de um novo documento, com os
    // dados que estão dentro de req.body
    await prisma.aluno.create({data: req.body})

    // Envia uma resposta de sucesso ao front-end
    // HTTP 201: Created
    res.status(201).end()
  }
  catch(error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error)
    // Envia o erro ao front-end, com status 500
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.retrieveAll = async function(req, res) {

  //Por padrão, não inclui nenhum relacionamento
  const include = {}

  if(req.query.turmas) include.turmas = true
  try {    
    // Manda buscar os dados no servidor
    const result = await prisma.aluno.findMany({
      include,
      orderBy: [
        { nome: 'asc' }  // Ordem ascendente
      ]
    })
    // HTTP 200: OK
    res.send(result)
  }
  catch(error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error)
    // Envia o erro ao front-end, com status 500
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.retrieveOne = async function(req, res) {
  try {
    const result = await prisma.aluno.findUnique({
      where: { id: req.params.id }
    })

    // Encontrou ~> retorna HTTP 200: OK
    if(result) res.send(result)
    // Não encontrou ~> retorna HTTP 404: Not found
    else res.status(404).end()
  }
  catch(error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error)
    // Envia o erro ao front-end, com status 500
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.update = async function(req, res) {
  try {
    const result = await prisma.aluno.update({
      where: { id: req.params.id },
      data: req.body
    })

    // Encontrou e atualizou ~> retorna HTTP 204: No content
    if(result) res.status(204).end()
    // Não encontrou (e não atualizou) ~> retorna HTTP 404: Not found
    else res.status(404).end()
  }
  catch(error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error)
    // Envia o erro ao front-end, com status 500
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.delete = async function(req, res) {
  try {
    const result = await prisma.aluno.delete({
      where: { id: req.params.id }
    })

    // Encontrou e excluiu ~> retorna HTTP 204: No content
    if(result) res.status(204).end()
    // Não encontrou (e não excluiu) ~> retorna HTTP 404: Not found
    else res.status(404).end()
  }
  catch(error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error)
    // Envia o erro ao front-end, com status 500
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.addTurma = async function(req, res) {
  try {

    // Busca aluno para recuperar a lista de ids de turmas dele
    const aluno = await prisma.aluno.findUnique({
      where: { id: req.params.alunoId}
    })

    // Se ele não tiver turmas ainda, criamos a lista vazia
    const turmaIds = aluno.turmaIds || []


    // Se o id de turma passado ainda não estiver na lista do
    // aluno, fazemos a respectiva inserção
    if(! turmaIds.includes(req.params.turmaId))
    turmaIds.push(req.params.turmaId)
    
    // Atualizamos o aluno com uma lista de ids de uma turma atualizada
    const result = await prisma.aluno.update({
      where: {id: req.params.alunoId },
      data: { turmaIds }
    })
    
  }
  catch {
     // Deu errado: exibe o erro no console do back-end
     console.error(error)
     // Envia o erro ao front-end, com status 500
     // HTTP 500: Internal Server Error
     res.status(500).send(error)
  }
}

controller.removeTurma = async function(req, res) {
  try {

    // Busca o aluno para recuperar a lista de ids de tumas dele
    const aluno = await prisma.aluno.findUnique({
      where: { id: req.params.alunoId }
    })

    //Não encontro o aluno, ou o aluno não tem turmas
    if(! aluno || ! aluno.turmaIds) res.send(404).end()

    // Procura na lista de ids de turma do aluno, se existe o id
    // de turma passado para a remoção
    for(let i = 0; i < alunos.turmaIds.length; i++) {
      // Encontrou
      if(aluno.turmaIds[i] === req.params.turmaId) {
        // Remove o id da turma da lista de ids de turma
        aluno.turmaIds.splice(i, 1)

        // Faz a atualização no aluno, alterando o conteúdo de turmasId
        const result = await prisma.aluno.update({
          where: { id: req.params.alunoId},
          data: { turmaIds: aluno.turmaIds}
        })

        // Encontrou e atualizou ~> retorna HTTP 204: No content
        if(result) return res.status(204).end()
        // Não encontrou (e não atualizou) ~> HTTP 404: Not Found
        return res.status(404).end()
      }
    }

  }catch {
    // Deu errado: exibe o erro no console do back-end
    console.error(error)
    // Envia o erro ao front-end, com status 500
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
 }
}

export default controller