import Head from 'next/head'

const HeadComponent = ({ title,description,content }) => {
    <Head>
        <title>{title}</title>
        <main name={description} content={content} />
    </Head>
}

export default HeadComponent