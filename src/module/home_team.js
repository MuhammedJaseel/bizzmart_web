export const teamPTitles = ["Team Members", "Partners"];
export const teamTitles = {
  title: [`Team List`, `Partners List`],
  titleAdd: [`Team List`, `Partners List`],
  desc: [
    `Shows all the team members recorded against your business`,
    `Shows all the partners recorded against your business`,
  ],
};

export const teamHeads0 = [
  null,
  "Name",
  "Code",
  "JoiningDate",
  "PhoneNumber",
  "Email",
  "SystemUser",
  "Status",
];
export const teamHeads1 = [
  null,
  "Name",
  "JoiningDate",
  "PhoneNumber",
  "Email",
  "Status",
  "Actions",
];

export const teamDummyData = {
  name: "",
  phone: "",
  email: "",
  address: "",
  role_id: "",
  permission: [],
  salary: "",
  salary_type_id: "",
  system_user: false,
  pin: "",
  password: "",
  join_date: "",
  dob: "",
  image: "",
  modules: [],
};

export const setTeamMemberRoles = (addMember, allRols, roleId, edit) => {
  addMember.modules = allRols.filter(
    (it) => it.id.toString() === roleId.toString()
  )[0]?.modules;
  if (!edit) {
    addMember.permission = [];
    for (let i = 0; i < addMember?.modules?.length; i++) {
      for (let j = 0; j < addMember.modules[i].pemissions.length; j++) {
        if (addMember.modules[i].pemissions[j].is_default)
          addMember.permission.push({
            permission_title: addMember.modules[i].pemissions[j].title,
            module_title: addMember.modules[i].title,
          });
      }
    }
  }
};
