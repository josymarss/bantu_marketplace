import {ObjectId} from 'mongodb';
import {ConnectToDatabase} from '../../../db/connection';
import styles from './followers.module.css';
import { useRouter } from 'next/router';

export default function ListFollowers({ myFollowers }){
      const router = useRouter();

      const Profile = () => (
            <div className={styles.profilecontainer}>
                  <p className={styles.follower}>Seguidores</p>
                  {myFollowers.length > 0 ? myFollowers.map(user => 
                        <div className={styles.headerprofile}>
                              <img src={user.avatar? '/uploads/'+user.avatar:'/camera.jpg'} className={styles.image} />
                              <p onClick={() => router.push('/profile/'+user._id)}>{user.fullName}</p>
                        </div>
                  ): <p>Sem seguidores</p>
                  }
            </div>   
      );
      
      
      return (
            <div className={styles.container}>
                 <Profile />
            </div>
      );
      
}

export const getServerSideProps = async (context) => {
      const id = context.params.iduser;
      const db = await ConnectToDatabase();
      const users = await db.collection('users');

      const user = await users.findOne({_id:ObjectId(id)});
      const { followers } = user;

      let myFollowers = []
      for(let i=0; i<followers.length; i++){
            let result = await users.findOne({_id:ObjectId(followers[i])});
            myFollowers.push(result);
      }
      myFollowers = JSON.parse(JSON.stringify(myFollowers));

      return {
            props:{
                  myFollowers
            }
      }
}