import { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { Videos } from './index'
import { fetchFromApi } from '../utils/fetchFromApi'
import { useParams } from 'react-router-dom'
import { Category } from '@mui/icons-material'

const SearchFeed = () => {
    const [videos, setVideos] = useState([])
    const { searchTerm } = useParams()


    useEffect(() => {
        fetchFromApi(`search?part=snippet&q=${searchTerm}`).then((data) => {
            setVideos(data.items)
        })
    }, [searchTerm])

    return (
        <Box p={2} sx={{
            overflowY: "auto",
            height: "90vh",
            flex: 2
        }}>
            <Typography variant='h4' fontWeight="bold" mb={2} sx={{
                color: "#fff"
            }}>
                Search Results for:
                <span style={{ color: "#f31503" }}> {searchTerm}</span> Videos
            </Typography>
            <Videos videos={videos} />
        </Box>
    )
}

export default SearchFeed