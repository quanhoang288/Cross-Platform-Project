import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, StyleSheet } from 'react-native';
import { PostItem } from '../../components/post';

const PostList = props => {
    const posts = [
        {
            author: {
                profileURI:'https://i.pinimg.com/236x/56/b6/f5/56b6f5fb5c9953347d4d8226da81521e--lookbook-app.jpg',
                name: 'Quan Hoang'
            },
            content: {
                id: 'abcs',
                timestamp: '2h',
                textContent: 'Chắc chắn nhà Glazer sẽ không sa thải Ole ngay sau trận thua Leicester nhưng nhìn vào lịch thi đấu trước mắt, nếu MU cứ đá như thế này thì chẳng có gì đảm bảo được cho tương lai của Ole cả',
                imageURI: 'https://scontent.fhan5-8.fna.fbcdn.net/v/t1.6435-9/244529074_4833866403302784_4250788985529987749_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=KYl29TGBKUkAX-Vng5s&_nc_ht=scontent.fhan5-8.fna&oh=b2d7d4b2de57cbf6147974547fcc489f&oe=618FDE27',
                numLikes: 15,
                numComments: 5
            },
        },
        {
            author: {
                profileURI:'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.6435-9/244531855_385626303281134_1187721163336951525_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=3QDch7qV0IUAX80KJJs&_nc_ht=scontent.fhan5-2.fna&oh=8ed2031797b605a4bb5a926fbcaf4a63&oe=619133E4',
                name: 'Hieu PC'
            },
            content: {
                id: 'asdfs',
                timestamp: '3h',
                textContent: 'Cảm ơn các bạn, các anh các chị, các bạn đồng nghiệp, các anh em Chống Lừa Đảo, tình yêu đặc biệt tới Ba Mẹ, gia đình và mọi người nhiều vì tất cả.',
                imageURI: 'https://scontent.fhan5-8.fna.fbcdn.net/v/t1.6435-9/244598026_391866049323826_8247410074313492823_n.jpg?_nc_cat=108&_nc_rgb565=1&ccb=1-5&_nc_sid=825194&_nc_ohc=M9JlfJ83VSMAX8Qzarz&_nc_ht=scontent.fhan5-8.fna&oh=5659173616e1f1ebbe1363f0785128c5&oe=61916EC8',
                numLikes: 800,
                numComments: 288
            },
        },
        {
            author: {
                profileURI:'https://scontent.fhan5-4.fna.fbcdn.net/v/t1.6435-9/150285232_2678444575800087_1595654179302721413_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=-wYNWJJOPmIAX8z4lLc&_nc_ht=scontent.fhan5-4.fna&oh=c5b6b4faf3e24f33b673b7a46bfa78e1&oe=619257B2',
                name: 'Trung Vu Hoang'
            },
            content: {
                id: 'sdfaasfa',
                timestamp: '6h',
                textContent: "But you’ll never be alone. I’ll be with you from dusk till dawn.I’ll be with you from dusk till dawn.Baby, I am right here =)))",
                imageURI: 'https://scontent.fhan5-4.fna.fbcdn.net/v/t1.6435-9/150285232_2678444575800087_1595654179302721413_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=-wYNWJJOPmIAX8z4lLc&_nc_ht=scontent.fhan5-4.fna&oh=c5b6b4faf3e24f33b673b7a46bfa78e1&oe=619257B2',
                numLikes: 155,
                numComments: 100
            },
        },
        {
            author: {
                profileURI:'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.6435-9/33717445_2017235158593393_2828700460834095104_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=0debeb&_nc_ohc=891Bj3nBfNAAX-ioJN5&tn=wmNj442-khagyQph&_nc_ht=scontent.fhan5-2.fna&oh=721f9bc5884f8fd045ee9060929dad82&oe=61914F23',
                name: 'Nguyen Xuan Tung'
            },
            content: {
                id: 'qewrsr',
                timestamp: '2h',
                textContent: 'Hom nay sao toi co don qua!!!',
                imageURI: 'https://i.scdn.co/image/ab67616d0000b273d6b89ae618df05a835f9e755',
                numLikes: 15,
                numComments: 5
            },
        },
    ]
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                {posts.map(post => (
                    <PostItem key={post.content.id} author={post.author} content={post.content} />
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    }
})

PostList.propTypes = {
    
};

export default PostList;