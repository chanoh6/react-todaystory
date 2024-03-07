import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();

  const go = (path) => navigate(path);
  const goBack = () => navigate(-1);
  const goHome = () => navigate('/');
  const goSearch = () => navigate('/search');
  const goChannel = (channelIdx) => navigate(`/channel/${channelIdx}`);
  const goStory = (idx) => navigate(`/story/${idx}`);
  const goEditStory = (idx) => navigate(`/story/edit/${idx}`);
  const goWriteStory = () => navigate('/story/write');
  const goEditChannel = (channelIdx) => navigate(`/channel/edit/${channelIdx}`);
  const goWriteChannel = () => navigate('/channel/write');
  const goMyFavorite = () => navigate('/favorite');
  const goMyHistory = () => navigate('/history');
  const goMyChannel = () => navigate('/mychannel');
  const goMyStory = () => navigate('/mystory');

  return {
    go,
    goBack,
    goHome,
    goSearch,
    goChannel,
    goStory,
    goEditStory,
    goWriteStory,
    goEditChannel,
    goWriteChannel,
    goMyFavorite,
    goMyHistory,
    goMyChannel,
    goMyStory,
  };
};
