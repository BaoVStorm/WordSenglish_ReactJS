const routes = {
    home: '/home',

    login: '/login',
    register: '/register',
    forget: '/forget',

    vocabulary: '/vocabulary',
    detailVocabulary: '/vocabulary/detail',
    createVocabulary: '/vocabulary/create',
    editVocabulary: '/vocabulary/edit',

    notFound: '/notfound'
} as const;

export default routes;
