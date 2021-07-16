import Comment from './comment'

const Card = () => {
      <div calssName='card'>
            <div className='about-project'>
                  <h6>App Name</h6>
                  <p>Like or status</p>
            </div>
            <p>Project type</p>
            <div className='graphic'>
                  <p>Should show de graphics!</p>
            </div>
            <div className='comment'>
                  <Comment /*user={user} - user should be an object passed in props*//>
            </div>
      </div>
}

export default Card