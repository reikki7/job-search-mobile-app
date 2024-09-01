import { useState } from 'react'
import { View, Text, Pressable, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'
import PopularjobCard from '../../common/cards/popular/PopularJobCard'
import useFetch from '../../../hook/useFetch'

const Popularjobs = () => {
  const router = useRouter()
  const { data, isLoading, error } = useFetch('search', {
    query: "Developer",
    num_pages: 1
  })

  console.log(data)

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`)
  }

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color={COLORS.primary} />
    } else if (error) {
      return <Text>Something went wrong</Text>
    } else {
      return (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <PopularjobCard
              item={item}
              handleCardPress={handleCardPress}
            />
          )}
          keyExtractor={(item) => item.job_id.toString()}
          contentContainerStyle={{ columnGap: SIZES.medium }}
          horizontal
        />
      )
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <Pressable>
          <Text style={styles.headerBtn}>Show All</Text>
        </Pressable>
      </View>

      <View style={styles.cardsContainer}>
        {renderContent()}
      </View>
    </View>
  )
}

export default Popularjobs