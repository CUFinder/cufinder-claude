
async function main() {
    console.log('server started')
}

main().catch((error) => {
    console.error('Server error:', error);
    process.exit(1);
});

