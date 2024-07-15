'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('role_modules', [{
      parent_id: null,
      sub_header_id: 1,
      name: "Dashboard",
      label: "Dashboard",
      icon: "tdesign:dashboard",
      route: "/dashboard",
      action: "/dashboard",
      is_dropdown: false,
      is_readonly: false,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      parent_id: null,
      sub_header_id: 1,
      name: "Profile",
      label: "Profile",
      icon: "iconamoon:profile",
      route: "/profile",
      action: "",
      is_dropdown: true,
      is_readonly: false,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      parent_id: 2,
      name: "Roles",
      label: "Roles",
      icon: "",
      action: "/profile/roles",
      route: "/profile/roles",
      is_dropdown: 0,
      is_readonly: 0,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      parent_id: 0,
      sub_header_id: 2,
      name: "Master",
      label: "Master",
      icon: "ci:main-component",
      action: "/master",
      route: "/master",
      is_dropdown: 1,
      is_readonly: 0,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      parent_id: 0,
      sub_header_id: 3,
      name: "PageContent",
      label: "Page Content",
      icon: "iconoir:page",
      action: "/page-content",
      route: "/page-content",
      is_dropdown: 0,
      is_readonly: 0,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      parent_id: 0,
      sub_header_id: 3,
      name: "Constants",
      label: "Constants",
      icon: "nonicons:constant-16",
      action: "/constants",
      route: "/constants",
      is_dropdown: 0,
      is_readonly: 0,
      created_at: new Date(),
      updated_at: new Date(),
    }])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
