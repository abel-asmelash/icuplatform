import ROUTES from "./routes";

export const DEFAULT_EMPITY ={
    title:"No Data Found",
    message: "Looks like the database is taking a nap. Wake it up with some new entries.",
    button:{
        text: "Add Data",
        href: ROUTES.HOME
    }
}


export const DEFAULT_ERROR = {
    title: "Oops! Something went wrong",
    message: "Even out code can sometimes fail. Give it another chance.",
    button:{
        text: "Try Again",
        href:ROUTES.HOME,
    },
}

export const EMPTY_QUESTION = {
    title: 'Ahh No Question Yet!',
    message: 'The Question board is empity. You can ask a Question.',
    button: {
        text: "Stel een Vraag",
        href: ROUTES.ASK_QUESTION
    }
}

export const EMPTY_TAGS = {
    title: "No Tags Found",
    message: "The tag cloud is empty. Add some keywords to make it appear.",
    button: {
        text: "Create Tag",
        href: ROUTES.TAGS
    }
}

export const EMPTY_ANSWERS = {
  title: "No Answers Found",
  message: "The answer board is empty. Add some relevant answers to make it appear"
 
};


export const EMPTY_COLLECTION ={
    title: "Collections Are Empty",
    message: "Looks Like you have not created any collection yet. Start curating something extraordinary today",
    button: {
        text: "Save to Collection",
        href: ROUTES.COLLECTION
    }
}
export const EMPTY_USERS = {
  title: "Geen gebruikers gevonden",
  message: "Je bent de enige hier. Er komen binnenkort meer gebruikers!",
};