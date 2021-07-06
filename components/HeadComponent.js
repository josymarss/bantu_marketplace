import Head from 'next/head'

export function headComponent ({ title,description,content }){
    return(
        <Head>
            <title>{title}</title>
            <main name={description} content={content} />
        </Head>
    )
}

export default headComponent