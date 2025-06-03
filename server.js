import express from 'express';
import pkg from '@prisma/client';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const app = express()
app.use(express.json())


const users = []

app.post('/usuarios', async (req, res) => {
   console.log(req.body)


   await prisma.user.create({
      data: {
         email: req.body.email,
         name: req.body.name,
         age: req.body.age 
      }
   })

   res.status(200).json({ message: "Usuário cadastrado com sucesso!" });
   res.status(201).json(req.body)
})


const getUsuarios = app.get('/usuarios', async (req, res) => {
   const users = await prisma.user.findMany()
   
   res.status(200).json({ message: "Busca efetuada com sucesso!" });
   res.status(200).json(users)

})


app.put('/usuarios/:id', async (req, res) => {
      await prisma.user.update({
         where: {
            id: req.params.id
         },
         data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
         }
      });

      getUsuarios;
});


app.delete('/usuarios/:id', async (req, res) => {
   await prisma.user.delete({
         where: {
            id: req.params.id
         }
   })
   res.status(200).json({ message: "Usuário deletado com sucesso!" });
})



app.listen(3000, () => {
   console.log('Servidor rodando na porta 3000');
}
   
)


/*
   Criar nossa API de Usuários

   - Criar um usuário
   - Listar todos os usuários
   - Editar um usuários
   - Deletar um usuários
*/ 