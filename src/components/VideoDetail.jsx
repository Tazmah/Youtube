import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import ReactPlayer from "react-player"
import { Typography, Box, Stack } from "@mui/material"
import { CheckCircle } from "@mui/icons-material"

import { Videos } from "./"
import { fetchFromApi } from "../utils/fetchFromApi"



const VideoDetail = () => {

    const { id } = useParams()
    const [videoInfo, setVideoInfo] = useState(null)
    const [relatedVideos, setRelatedVideos] = useState(null)

    useEffect(() => {
        fetchFromApi(`videos?part=snippet,statistics&id=${id}`).then((data) => {
            setVideoInfo(data.items[0])
        })

        fetchFromApi(`search?part=snippet&relatedToVideoId=${id}&type=video`)
            .then((data) => setRelatedVideos(data.items))

    }, [id])


    if (!videoInfo?.snippet) return "Loading...";

    const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoInfo;
    return (
        <Box minHeight="95vh">
            <Stack direction={{ xs: "column", md: "row" }}>
                <Box flex={1} >
                    <Box overflow='auto' sx={{ width: "100%", position: "sticky", top: "86px" }}>
                        <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
                        <Typography color="#fff" variant="h6" fontWeight="bold" px={2} py={1}>
                            {title}
                        </Typography>
                        <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} >
                            <Typography variant={{ sm: "subtitle1", md: 'h6' }} color="#fff" >
                                {channelTitle}
                                <CheckCircle sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                            </Typography>
                            <Stack direction="row" gap="20px" alignItems="center">
                                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                                    {parseInt(viewCount).toLocaleString()} views
                                </Typography>
                                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                                    {parseInt(likeCount).toLocaleString()} likes
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
                <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
                    <Videos videos={relatedVideos} direction="column" />
                </Box>
            </Stack>
        </Box>
    )
}

export default VideoDetail