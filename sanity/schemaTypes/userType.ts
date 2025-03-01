import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";


export const userType = defineType({
    name:"user",
    title:"Users",
    type:"document",
    icon:UserIcon,
    fields:[
        defineField({
            name:"email",
            title:"Email",
            type:"string",
        }),
        defineField({
            name:"phone",
            title:"Phone",
            type:"string",
        })
    ]
})