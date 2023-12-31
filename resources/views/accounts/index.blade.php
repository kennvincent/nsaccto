<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Accounts sdfdf</h1>
    <table>
        <thead>
            <tr>
                <th>Account Description</th>
                <th>Account Code</th>
            </tr>
        </thead>
        <tbody>
            @foreach($accounts as $account)
                <tr>
                    <td>{{$account['accountdesc']}}</td>
                    <td>{{$account['accountcode']}}</td>
                </tr>
            @endforeach
        </tbody>
       
    </table>
   

</body>
</html>