import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

const def_callback = () => { };

/* Themes */
export const createTheme = (params, callback = def_callback) => {
    apiFetch({
        method: 'POST',
        path: addQueryArgs('gtb-backend/v1/themes/create'),
        data: {
            ...params
        }
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};

export const updateTheme = (params, id, callback = def_callback) => {
    apiFetch({
        method: 'POST',
        path: addQueryArgs('gtb-backend/v1/themes/update'),
        data: {
            theme_id: id,
            ...params
        }
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};

export const updateOtherData = (params, callback = def_callback) => {
    apiFetch({
        method: 'POST',
        path: addQueryArgs('gtb-backend/v1/themes/other'),
        data: {
            ...params
        }
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};

export const updateActiveTheme = (id, callback = def_callback) => {
    apiFetch({
        method: 'POST',
        path: addQueryArgs('gtb-backend/v1/themes/active'),
        data: {
            theme_id: id,
        }
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};

export const deleteTheme = (id, callback = def_callback) => {
    apiFetch({
        method: 'POST',
        path: addQueryArgs('gtb-backend/v1/themes/delete', {
            theme_id: id,
        }),
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};

export const getThemeList = (callback = def_callback) => {
    apiFetch({
        path: addQueryArgs('gtb-backend/v1/themes/list'),
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};

export const getThemeListPagination = ( request, callback = def_callback ) => {
    apiFetch({
        method: 'POST',
        path: addQueryArgs('gtb-backend/v1/themes/list', request),
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
}

export const getThemeData = (id, callback = def_callback) => {
    apiFetch({
        path: addQueryArgs('gtb-backend/v1/themes/data', {
            id
        }),
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};

export const exportTheme = (callback = def_callback) => {
    apiFetch({
        method: 'POST',
        path: addQueryArgs('gtb-backend/v1/themes/export'),
        data: {}
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};


/* Templates */

export const getTemplateList = (callback = def_callback) => {
    apiFetch({
        path: addQueryArgs('gtb-backend/v1/templates/list'),
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};


export const createTemplate = (params, callback = def_callback) => {
    const {
        template_data = {}
    } = params;

    apiFetch({
        method: 'POST',
        path: addQueryArgs('gtb-backend/v1/templates/create'),
        data: {
            template_data
        }
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};

export const deleteTemplate = (params, callback = def_callback) => {
    const {
        template_data = {}
    } = params;

    apiFetch({
        method: 'POST',
        path: addQueryArgs('gtb-backend/v1/templates/delete'),
        data: {
            template_data
        }
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};

/* Page */
export const getPageList = (callback = def_callback) => {
    apiFetch({
        path: addQueryArgs('gtb-backend/v1/pages/list'),
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};

export const deletePage = (params, callback = def_callback) => {
    apiFetch({
        method: 'POST',
        path: addQueryArgs('gtb-backend/v1/pages/delete'),
        data: {
            ...params
        }
    }).then((response) => {
        callback(response.data);
    }).catch((err) => {
        alert(err.message)
    });
};

/* Patterns */

export const getPatternList = (params, callback = def_callback) => {
    apiFetch({
        path: addQueryArgs('gtb-backend/v1/pattern/list', {
            ...params
        }),
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};

export const getPatternListPagination = (request, callback = def_callback) => {
    apiFetch({
        method: 'POST',
        path: addQueryArgs('gtb-backend/v1/pattern/list', request),
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};

export const deletePattern = (params, callback = def_callback) => {
    apiFetch({
        method: 'POST',
        path: addQueryArgs('gtb-backend/v1/pattern/delete'),
        data: {
            ...params
        }
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};



/* Assets */

export const getAssetList = (callback = def_callback) => {
    apiFetch({
        path: addQueryArgs('gtb-backend/v1/assets/list'),
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};

export const updateAsset = (params, callback = def_callback) => {
    apiFetch({
        method: 'POST',
        path: addQueryArgs('gtb-backend/v1/asset/update'),
        data: {
            ...params
        },
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};

export const createAsset = (params, callback = def_callback) => {
    apiFetch({
        method: 'POST',
        path: addQueryArgs('gtb-backend/v1/asset/create'),
        data: {
            ...params
        },
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};


export const deleteAsset = (params, callback = def_callback) => {
    apiFetch({
        method: 'POST',
        path: addQueryArgs('gtb-backend/v1/asset/delete'),
        data: {
            ...params
        },
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};

/* Fonts */

export const getFontList = (callback = def_callback) => {
    apiFetch({
        path: addQueryArgs('gtb-backend/v1/fonts/list'),
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};

export const updateFont = (params, callback = def_callback) => {
    apiFetch({
        method: 'POST',
        path: addQueryArgs('gtb-backend/v1/font/update'),
        data: {
            ...params
        },
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};

export const createFont = (params, callback = def_callback) => {
    apiFetch({
        method: 'POST',
        path: addQueryArgs('gtb-backend/v1/font/create'),
        data: {
            ...params
        },
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};


export const deleteFont = (params, callback = def_callback) => {
    apiFetch({
        method: 'POST',
        path: addQueryArgs('gtb-backend/v1/font/delete'),
        data: {
            ...params
        },
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};


/* Fontsize */

export const getFontsizeList = (callback = def_callback) => {
    apiFetch({
        path: addQueryArgs('gtb-backend/v1/fontsizes/list'),
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};

export const updateFontsize = (params, callback = def_callback) => {
    apiFetch({
        method: 'POST',
        path: addQueryArgs('gtb-backend/v1/fontsize/update'),
        data: {
            ...params
        },
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};

export const createFontsize = (params, callback = def_callback) => {
    apiFetch({
        method: 'POST',
        path: addQueryArgs('gtb-backend/v1/fontsize/create'),
        data: {
            ...params
        },
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};


export const deleteFontsize = (params, callback = def_callback) => {
    apiFetch({
        method: 'POST',
        path: addQueryArgs('gtb-backend/v1/fontsize/delete'),
        data: {
            ...params
        },
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};

/* Get WP.org plugin list */
export const getPluginList = (search = '', callback = def_callback) => {
    fetch(
        `https://api.wordpress.org/plugins/info/1.2/?action=query_plugins&request[page]=1&request[per_page]=10&request[search]=${search}}`,
        {
            method: 'GET',
        }
    ).then((response) => {
        return response.json();
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};

/* Globalstles */

export const getGlobalList = (callback = def_callback) => {
    apiFetch({
        path: addQueryArgs('gtb-backend/v1/globalstyles/list'),
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};

export const updateGlobal = (params, callback = def_callback) => {
    apiFetch({
        method: 'POST',
        path: addQueryArgs('gtb-backend/v1/globalstyle/update'),
        data: {
            ...params
        },
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};

export const createGlobal = (params, callback = def_callback) => {
    apiFetch({
        method: 'POST',
        path: addQueryArgs('gtb-backend/v1/globalstyle/create'),
        data: {
            ...params
        },
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};


export const deleteGlobal = (params, callback = def_callback) => {
    apiFetch({
        method: 'POST',
        path: addQueryArgs('gtb-backend/v1/globalstyle/delete'),
        data: {
            ...params
        },
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};

export const updateActiveGlobal = (id, callback = def_callback) => {
    apiFetch({
        method: 'POST',
        path: addQueryArgs('gtb-backend/v1/globalstyle/active'),
        data: {
            global_id: id,
        }
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};

export const importGlobaStyle = (params, callback = def_callback) => {
    const file = params.get('file');

    apiFetch({
        method: 'POST',
        path: addQueryArgs('gtb-backend/v1/globalstyle/import'),
        body: params,
        processData: false,
        contentType: false,
        headers: {
            'Content-Disposition': 'attachment; filename="' + file.name + '"'
        }
    }).then((response) => {
        callback(response);
    }).catch(() => {
    });
};
