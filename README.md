# React@19 + urql@4.2.2 + react-router@7.7.0

This repo showcases a problem when using urql (network-only requestPolicy) in combination of the packages listed above on those indicated versions.<br/>
This is a simple SPA application with no server whatsoever. So react-router is in [declarative mode](https://reactrouter.com/start/declarative/routing)<br/>

When using `useQuery` in a page, then navigates to another page using `useQuery` with the same shared query, the second page shows a teardown and cancelation on the first request and then a second request is run and returns just fine.<br/>
Look at the screencast:

https://github.com/user-attachments/assets/6fc2c5c6-2424-446a-9af6-cca0ce460c63

