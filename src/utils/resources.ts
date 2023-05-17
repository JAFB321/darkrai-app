import { ResourceProps } from "@refinedev/core";

export const adminResources: ResourceProps[] = [
    {
      name: "medicamento",
      list: "/medicamentos",
      create: "/medicamentos/create",
      edit: "/medicamentos/edit/:id",
      show: "/medicamentos/show/:id",
      meta: {
        canDelete: true,
      },
    },
    {
      name: "paciente",
      list: "/pacientes",
      create: "/pacientes/create",
      edit: "/pacientes/edit/:id",
      show: "/pacientes/show/:id",
      meta: {
        canDelete: true,
      },
    },
    {
      name: "enfermero",
      list: "/enfermeros",
      create: "/enfermeros/create",
      edit: "/enfermeros/edit/:id",
      show: "/enfermeros/show/:id",
      meta: {
        canDelete: true,
      },
    },
    {
      name: "tratamiento",
      list: "/tratamientos",
      create: "/tratamientos/create",
      edit: "/tratamientos/edit/:id",
      show: "/tratamientos/show/:id",
      meta: {
        canDelete: true,
        hide: true
      },
    },
    {
      name: "plan-medicacion",
      create: "/plan-medicaciones/create",
      edit: "/plan-medicaciones/edit/:id",
      show: "/plan-medicaciones/show/:id",
      meta: {
        canDelete: true,
        hide: true
      },
    },
    {
      name: "suministrar/all",
      list: "/suministrar",
      meta: {
        label: 'Suministrar',
      }
      
    },
    {
      name: "contenedor",
      list: "/contenedor",
      edit: "/contenedor/edit/:id",
      show: "/contenedor/show/:id",
      meta: {
        label: 'Contenedores',
      }
      
    },
    // {
    //   name: "categories",
    //   list: "/categories",
    //   create: "/categories/create",
    //   edit: "/categories/edit/:id",
    //   show: "/categories/show/:id",
    //   meta: {
    //     canDelete: true,
    //   },
    // },
  ]

  export const enfermeroResources: ResourceProps[] = [
    {
      name: "medicamento",
      list: "/medicamentos",
      show: "/medicamentos/show/:id",
      meta: {},
    },
    {
      name: "paciente",
      list: "/pacientes",
      show: "/pacientes/show/:id",
      meta: {},
    },
    {
      name: "enfermero",
      meta: {},
    },
    {
      name: "tratamiento",
      list: "/tratamientos",
      show: "/tratamientos/show/:id",
      meta: {
        hide: true
      },
    },
    {
      name: "plan-medicacion",
      create: "/plan-medicaciones/create",
      edit: "/plan-medicaciones/edit/:id",
      show: "/plan-medicaciones/show/:id",
      meta: {
        hide: true
      },
    },
    {
      name: "suministrar/all",
      list: "/suministrar",
      meta: {
        label: 'Suministrar',
      }
      
    },
    {
      name: "contenedor",
      meta: {}
      
    },
    // {
    //   name: "categories",
    //   list: "/categories",
    //   create: "/categories/create",
    //   edit: "/categories/edit/:id",
    //   show: "/categories/show/:id",
    //   meta: {
    //     canDelete: true,
    //   },
    // },
  ]