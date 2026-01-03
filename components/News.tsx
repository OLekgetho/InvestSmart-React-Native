import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    Linking,
    ActivityIndicator,
} from 'react-native';

type NewsItem = {
    id: string;
    content: {
        title: string;
        contentType: string;
        pubDate: string;
        thumbnail:{
            originalUrl: string;
        };
        canonicalUrl: {
            url: string;
        };
    };
};

type NewsProps = {
    symbol: string;
};

export default function News({ symbol }: NewsProps) {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!symbol) return; // skip if no symbol
        setLoading(true);
        fetch(`http://192.168.1.105:8085/api/stock/info/news/${symbol}`)
            .then(res => res.json())
            .then(data => {
                setNews(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setNews([]);
                setLoading(false);
            });
    }, [symbol]);

    const renderItem = ({ item }: { item: NewsItem }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => Linking.openURL(item.content.canonicalUrl.url)}
        >

            {item.content.thumbnail?.originalUrl && (
                <Image
                    source={{ uri: item.content.thumbnail.originalUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}
            <Text style={styles.title} numberOfLines={3}>
                {item.content.title}
            </Text>
            <Text style={styles.date}>
                Publish Date: {new Date(item.content.pubDate).toLocaleDateString()} {new Date(item.content.pubDate)
                .toLocaleTimeString()}
            </Text>
        </TouchableOpacity>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />;
    }

    if (!news.length) {
        return <Text style={{ color: 'white', marginTop: 20 }}>No news available</Text>;
    }

    return (
        <FlatList
            data={news}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 16, marginTop: 10 }}
        />
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1e1e1e',
        padding: 19,
        borderRadius: 12,
        marginRight: 12,
        width: 250,
        overflow: 'hidden',
    },
    title: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
    },
    date: {
        color: '#9ca3af',
        fontSize: 12,
    },
    contenttype: {
        color: '#9ca3af',
        fontSize: 12,
        textTransform: "lowercase",
    },
    image: {
        width: '90%',
        height: 110,
        marginBottom: 8,
    },
});
