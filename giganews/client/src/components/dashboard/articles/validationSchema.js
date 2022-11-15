import * as Yup from 'yup'

export const formValues = {
    title:'',
    content:'',
    excerpt:'',
    score:0,
    director:'',
    actors:[],
    status:'draft'
}

export const validation = () => (
    Yup.object({
        title:Yup.string()
            .required('Sorry the title is required'),
        content:Yup.string()
            .required('Sorry the content is required')
            .min(50,'That is it ? ...write some more'),
        excerpt:Yup.string()
            .required('Sorry the excerpt is required')
            .min(50, 'Sorry 50 characters minimum')
            .max(500,'Sorry its 500 maximum'),
        score:Yup.number()
            .required('Sorry the score is required')
            .min(0,'0 is the minimum')
            .max(100,'100 is the max'),
        director:Yup.string()
            .required('Sorry the director is required'),
        actors:Yup.array()
            .required('Must have actors')
            .min(3,'Minimum is 3')
            .max(10,'No more than 10 actors'),
        status:Yup.string()
            .required('Sorry the status is required')
    })
)