import Perms from "../models/perms.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const permData = [
  {
    name: "admin",
    description: "Acesso total ao sistema",
  },
  {
    name: "user",
    description: "Acesso limitado ao sistema",
  },
];

const seedPerms = async () => {
  const cont = await Perms.count();
  try {
    if (cont === 0) {
      await Perms.bulkCreate(permData);
      console.log("Permissões criadas com sucesso!");
    } else {
      console.log("Permissões já existem, não foi necessário criar.");
    }
  } catch (error) {
    console.error("Erro ao criar permissões:", error);
  }
};

const seedAdminUser = async () => {
  const cont = await User.count();
  const password = "admin123";
  const hashedPassword = await bcrypt.hash(password, 10);

  const adminUser = [
    {
      name: "admin",
      username: "admin",
      email: "admin@exemplo.com",
      password: hashedPassword,
      permsId: 1,
    }
  ];
  
  try {
    if (cont === 0) {
      await User.bulkCreate(adminUser);
      console.log("Usuário administrador criado com sucesso!");
    } else {
      console.log("Usuário administrador já existe, não foi necessário criar.");
    }
  } catch (error) {
    console.error("Erro ao criar usuário administrador:", error);
  }
};

export { seedPerms, seedAdminUser };
